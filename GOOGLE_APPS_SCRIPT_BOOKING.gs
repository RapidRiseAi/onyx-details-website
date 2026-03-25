/**
 * Onyx Details booking webhook for Google Apps Script.
 *
 * Key fixes in this version:
 * 1) No bulk checkbox insertion across max rows (prevents row 1001 issue).
 * 2) New bookings are inserted at row 2 (directly under headers, newest first).
 * 3) Completed bookings can be archived via Done? checkbox (newest archived first).
 */

const SPREADSHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
const ACTIVE_SHEET = 'Active Bookings';
const ACTIVE_FALLBACK_SHEET = 'Bookings';
const ARCHIVE_SHEET = 'Archived Bookings';
const COMPANY_EMAIL = 'onyxdetails17@gmail.com';
const TIMEZONE = 'Africa/Johannesburg';

const HEADERS = [
  'Done?',
  'Timestamp',
  'Service Type',
  'Estimated Price',
  'Client Name',
  'Client Email',
  'Client Phone',
  'City',
  'Preferred Date',
  'Add-ons',
  'Add-on Application',
  'Paint Correction',
  'Notes',
  'Raw Payload JSON'
];

function setupSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const active = getActiveSheet_(ss);
  const archive = getOrCreateSheet_(ss, ARCHIVE_SHEET);

  ensureHeaders_(active);
  ensureHeaders_(archive);
}

function doPost(e) {
  let payload = {};

  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('No POST payload received.');
    }

    payload = JSON.parse(e.postData.contents);
    validatePayload_(payload);

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const active = getActiveSheet_(ss);
    ensureHeaders_(active);

    const timestamp = Utilities.formatDate(new Date(), TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
    const addOns = normalizeList_(payload.addOns);
    const paintCorrection = normalizeList_(payload.paintCorrectionOptions);

    const row = [
      false,
      timestamp,
      payload.serviceType || '',
      payload.estimatedPrice || '',
      payload.clientName || '',
      payload.clientEmail || '',
      payload.clientPhone || '',
      payload.city || '',
      payload.preferredDate || '',
      addOns,
      payload.addOnApplication || '',
      paintCorrection,
      payload.notes || '',
      JSON.stringify(payload)
    ];

    // Insert directly below headers so newest bookings stay at the top.
    active.insertRowAfter(1);
    active.getRange(2, 1, 1, HEADERS.length).setValues([row]);
    active.getRange(2, 1).insertCheckboxes();

    sendCompanyEmail_(payload, timestamp, addOns, paintCorrection);
    sendCustomerEmail_(payload, addOns, paintCorrection);

    return json_({ ok: true, message: 'Booking saved + emails sent.' });
  } catch (error) {
    MailApp.sendEmail({
      to: COMPANY_EMAIL,
      subject: 'ONYX BOOKING SCRIPT ERROR',
      body: [
        `Error: ${error && error.message ? error.message : String(error)}`,
        '',
        'Payload:',
        JSON.stringify(payload, null, 2)
      ].join('\n')
    });

    return json_({
      ok: false,
      message: error && error.message ? error.message : String(error)
    });
  }
}

function doGet() {
  return json_({ ok: true, message: 'Booking endpoint live.' });
}

function archiveCompletedBookings() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const active = getActiveSheet_(ss);
  const archive = getOrCreateSheet_(ss, ARCHIVE_SHEET);

  ensureHeaders_(active);
  ensureHeaders_(archive);

  const lastRow = active.getLastRow();
  if (lastRow < 2) return;

  const rows = active.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
  const rowsToArchive = [];
  const rowsToDelete = [];

  rows.forEach((row, index) => {
    if (row[0] === true) {
      rowsToArchive.push(row);
      rowsToDelete.push(index + 2);
    }
  });

  if (!rowsToArchive.length) return;

  // Insert archived rows directly below archive headers so newest archived items stay at top.
  archive.insertRowsAfter(1, rowsToArchive.length);
  archive.getRange(2, 1, rowsToArchive.length, HEADERS.length).setValues(rowsToArchive);
  archive.getRange(2, 1, rowsToArchive.length, 1).insertCheckboxes();

  // Delete checked rows bottom-up so indexes remain valid.
  for (let i = rowsToDelete.length - 1; i >= 0; i -= 1) {
    active.deleteRow(rowsToDelete[i]);
  }
}

function sendCompanyEmail_(payload, timestamp, addOns, paintCorrection) {
  MailApp.sendEmail({
    to: COMPANY_EMAIL,
    subject: `New Booking: ${payload.serviceType || 'Unknown Service'}`,
    body: [
      'A new booking request was submitted.',
      '',
      `Timestamp: ${timestamp}`,
      `Service: ${payload.serviceType || ''}`,
      `Estimated Price: ${payload.estimatedPrice || ''}`,
      `Client Name: ${payload.clientName || ''}`,
      `Client Email: ${payload.clientEmail || ''}`,
      `Client Phone: ${payload.clientPhone || ''}`,
      `City: ${payload.city || ''}`,
      `Preferred Date: ${payload.preferredDate || ''}`,
      `Add-ons: ${addOns || 'None'}`,
      `Add-on Application: ${payload.addOnApplication || 'N/A'}`,
      `Paint Correction: ${paintCorrection || 'None'}`,
      `Notes: ${payload.notes || 'None'}`
    ].join('\n')
  });
}

function sendCustomerEmail_(payload, addOns, paintCorrection) {
  if (!payload.clientEmail) return;

  MailApp.sendEmail({
    to: payload.clientEmail,
    subject: 'Thank you for your booking request | Onyx Details',
    body: [
      `Hi ${payload.clientName || 'there'},`,
      '',
      'Thank you for your booking request with Onyx Details.',
      '',
      'We received:',
      `- Service: ${payload.serviceType || ''}`,
      `- Preferred Date: ${payload.preferredDate || ''}`,
      `- City: ${payload.city || ''}`,
      `- Estimated Price: ${payload.estimatedPrice || 'To be confirmed'}`,
      `- Add-ons: ${addOns || 'None'}`,
      `- Paint Correction: ${paintCorrection || 'None'}`,
      '',
      'Kaden from Onyx Details will contact you shortly.',
      '',
      'Kind regards,',
      'Onyx Details'
    ].join('\n')
  });
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== 'object') throw new Error('Invalid JSON payload.');
  if (!payload.serviceType) throw new Error('Missing serviceType');
  if (!payload.clientName) throw new Error('Missing clientName');
  if (!payload.clientEmail) throw new Error('Missing clientEmail');
  if (!payload.clientPhone) throw new Error('Missing clientPhone');
  if (!payload.city) throw new Error('Missing city');
  if (!payload.preferredDate) throw new Error('Missing preferredDate');
}

function normalizeList_(value) {
  if (!value) return '';
  return Array.isArray(value) ? value.join(', ') : String(value);
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    return;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const headersMatch = HEADERS.every((header, index) => String(currentHeaders[index] || '').trim() === header);

  if (!headersMatch) {
    sheet.insertRowBefore(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  sheet.setFrozenRows(1);
}

function getActiveSheet_(ss) {
  return ss.getSheetByName(ACTIVE_SHEET) || ss.getSheetByName(ACTIVE_FALLBACK_SHEET) || ss.insertSheet(ACTIVE_SHEET);
}

function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
