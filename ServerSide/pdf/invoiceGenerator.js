const PDFDocument = require("pdfkit");


async function buildPDF(dataCallback, endCallback, user, invoice, client) {
  try {
    let doc = new PDFDocument({ bufferPages: true, size: "A4", margin: 50, compress: false });
    doc.on("data", dataCallback);
    doc.on("end", endCallback);
    generateHeader(doc, user);
    generateCustomerInformation(doc, invoice, client);
    generateInvoiceTable(doc, invoice);
    generateBankDetails(doc, user);
    generateFooter(doc);


    doc.end();
  } catch (error) {
    console.log('buildPDF catch: ', error);
    return
  }
}

function generateHeader(doc, user) {
  const data = {
    address: user.address || '',
    houseNumber: user.houseNumber || '',
    city: user.city || '',
    zip: user.zip || '',
  }
  doc.lineWidth(30);
  doc
  .lineCap('butt')
  .moveTo(50, 30)
  .lineTo(550, 30)
  .stroke("#000080")
  .fillColor('#FFFFFF')
  .fontSize(20)
  .text(user.fName + ' ' + user.lName, 60, 22)
  .fillColor('#FFFFFF')
  .fontSize(20)
  .text("Invoice", 470, 22)
  doc
    .fillColor("#444444")
    .fontSize(10)
    .text(data.address + ", " + data.houseNumber, 50, 70, { align: "left" })
    .text(data.city + ", " + data.zip, 50, 85, { align: "left" })
    .moveDown();
}
let balance;
let totalTax;
function generateCustomerInformation(doc, invoice, client) {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);
 balance = invoice.items.reduce((prev, curr) => {
  let current = curr.hours * curr.amount;
  return prev + current;
}, 0)
totalTax = invoice.items.reduce((acc, item) => {
    acc = acc + ( (item.amount * item.hours / 100) * item.tax);
  return acc;
}, 0)
  generateHr(doc, 185);

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, 200)
    .font("Helvetica-Bold")
    .text(invoice.invoiceNumber, 150, 200)
    .font("Helvetica")
    .text("Invoice Date:", 50, 200 + 15)
    .text(formatDate(invoice.date), 150, 200 + 15)
    .text("Balance Due:", 50, 200 + 30)
    .text(formatCurrency(balance), 150, 200 + 30)

    .font("Helvetica-Bold")
    .text("Bill To: ", 360, 200)
    .font("Helvetica")
    .text(invoice.clientName.toUpperCase(), 410, 200)
    .font("Helvetica")
    .text(client.address.address + ", " + ' ' + client.address.houseNumber, 410, 215)
    .text(
      client.address.city + ", " + client.address.zip,
      410,
      230
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  doc.font("Helvetica-Bold");
  generateTableRow(doc, 330, "Item", "Description", "Unit Cost", "Quantity", "Tax", "Line Total");
  generateHr(doc, 330 + 20);
  doc.font("Helvetica");
  let i;
  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = 330 + (i + 1) * 30;
    generateTableRow(doc, position, i+1, item.description.slice(0, 25), formatCurrency(item.amount), item.hours, addPercent(item.tax), formatCurrency((item.hours * item.amount) + (((item.hours * item.amount) / 100) * item.tax) ));
    generateHr(doc, position + 20);
  }
  const subtotalPosition = 330 + (i + 1) * 30;
  generateTableRow(doc, subtotalPosition, "", "","", "", "Subtotal", formatCurrency(balance));

  const taxPosition = subtotalPosition + 20;
  generateTableRow(doc, taxPosition, "", "","","", "Total Tax", formatCurrency(totalTax));

  const paidToDatePosition = taxPosition + 20;
  generateTableRow(doc, paidToDatePosition, "", "","","", "Paid To Date", formatCurrency(0));

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "",
    "",
    "Balance Due",
    formatCurrency(balance + Number(totalTax))
  );
  doc.font("Helvetica");
}

function generateBankDetails(doc, user) {
  const bd = {
    bank: user.bank || '',
    iban: user.iban || '',
    bic: user.bic || '',
  }

  doc
    .fontSize(10)
    .text( bd.bank , 50, 700, { align: "left", width: 500 });
    doc
    .fontSize(10)
    .text( bd.iban , 50, 715, { align: "left", width: 500 });
    doc
    .fontSize(10)
    .text( bd.bic , 50, 730, { align: "left", width: 500 });
}

function generateFooter(doc) {
  doc.lineWidth(15);
  doc
  .lineCap('butt')
  .moveTo(50, 783)
  .lineTo(550, 783)
  .stroke("#000080")
  doc
    .fontSize(8)
    .fillColor("#FFFFFF")
    .text("This is computer generated invoice no signature required.", 50, 780, { align: "center", width: 500 });
}

function generateTableRow(doc, y, item, description, unitCost, quantity, tax, lineTotal) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 100, y)
    .text(unitCost, 180, y, { width: 90, align: "right" })
    .text(quantity, 300, y, { width: 90, align: "right" })
    .text(tax, 370, y, {width: 80, align: 'right'} )
    .text(lineTotal, 350, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function addPercent(tax) {
  return tax + "%";
}

function formatCurrency(amount) {
  return "€" + Number(amount).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return day + "-" + month + "-" + year;
}

module.exports = {
  buildPDF,
};
