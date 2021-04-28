import { Component, OnInit } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../assets/vfs_fonts.js';
import { setDefaultStyle, setStyles, setPdfMakeFonts } from './configPdfMake/pdfMakeConfig';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-pdf-print',
  templateUrl: './pdf-print.component.html',
  styleUrls: ['./pdf-print.component.css']
})
export class PdfPrintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generatePdf(action = 'open') {
    console.log(pdfMake);
    // set custom fonts
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition();

    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;

      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }
  getDocumentDefinition() {
    return {
      info: {
        title: 'BILLOnWEB',
        author: 'Limon',
        subject: 'Bill of document',
        keywords: 'keywords for document',
        creationDate: Date.now(),
      },
      pageSize: 'A4',
      content: [
        this.getHeading(),
        this.getUserMeterInformation(),
        this.getMeterUnit(),
        this.getBillPerMonth(),
        this.getDuesInformation(),
        this.getNexPage(),
        { text: "BILLPAY MARKED SHOP OR BANK & OFFICE COPY", style: 'setRight', margin: [0, 5, 20, 0] },
        this.getOfficeCopySection(),
        this.getFooter()
      ],
      defaultStyle: setDefaultStyle,
      styles: setStyles
    }
  }
  // table date information
  setTableBorderColor() {
    return {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 1 : 1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
      },
      hLineColor: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? '#458BD1' : '#458BD1';
      },
      vLineColor: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? '#458BD1' : '#458BD1';
      }
    }
  }

  getHeading() {
    return {
      margin: [-10, -20, 0, 0],
      table: {
        widths: [100, '*', '*', 100],

        body: [
          [
            { border: [false, false, false, false], image: `logo.png`, width: 70, height: 60, color: 'gray', rowSpan: 2 },
            { border: [false, false, false, false], text: `LT CONSUMER (Single Register)`, colSpan: 2 },
            {},
            {
              border: [false, false, false, false], style: ['setBold'], text: `CONSUMER'S COPY`
            }
          ],
          [
            {},
            {
              border: [false, false, false, false], style: ['setBold'], text: `BANGLADESH POWER DEVELOPMENT BOARD\nELECTRICITY BILL
          `, colSpan: 2
            },
            {},
            { border: [false, false, false, false], image: `slogan2.png`, width: 60, height: 60, rowSpan: 2 }
          ],
          [
            { border: [false, false, false, false], style: ['setBlack'], text: `S & D Patharghata` },
            {
              border: [false, false, false, false], style: ['setBlack', 'setRight', 'setTitleBold'], text: `Balance: 0.00`, colSpan: 2
            },
            {},
            {}
          ]
        ]
      }
    }
  }
  getFooter() {
    return {
      margin: [0, 7, 0, 0],
      table: {
        widths: ['*', '*', '*'],

        body: [
          [
            { border: [false, false, false, false], style: ['setLeft', 'footer'], text: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড', margin: [0, 0, 0, 0] },
            { border: [false, false, false, false], style: ['footer'], text: 'সদা আপনার সেবায় নিয়োজিত ', margin: [0, 0, 0, 0] },
            { border: [false, false, false, false], style: ['setRight', 'footer'], text: 'অপর পৃষ্ঠায় বর্ণিত নির্দেশনাবলী দেখুন', margin: [0, 0, 0, 0] }
          ],
        ]
      }
    }
  }
  getUserMeterInformation() {
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', '*', '*', 'auto', 'auto', 'auto'],
        headerRows: 1,
        body: [
          [
            { border: [true, true, true, false], style: ['setBlack', 'setLeft'], text: 'BASIR AHMED', colSpan: 4 },
            {},
            {},
            {},
            { text: 'MONTH', colSpan: 2 },
            {},
            { style: ['setTitleBold'], text: `BILL NO`, colSpan: 2 }, {},
            { text: 'CD' },
            { text: 'ISSUE DATE' },
          ],
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: '20,RAJAKHALI ROAD', colSpan: 4 },
            {},
            {},
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: 'Jan-21', colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: '1708541', colSpan: 2 }, {},
            { border: [false, true, false, true], style: ['setBlack'], text: '04' },
            { border: [false, true, true, true], style: ['setBlack'], text: '20/12/2020' },
          ],
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: 'BASIR AHMED', colSpan: 4 },
            {},
            {},
            {},
            { text: 'LOCATION', colSpan: 2 },
            {},
            { text: 'BILL GROUP', colSpan: 2 }, {},
            { text: 'BOOK NO' },
            { text: 'WALK ORD' },
          ],
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: '20,RAJAKHALI ROAD', colSpan: 4 },
            {},
            {},
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: 'E1', colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: '01', colSpan: 2 }, {},
            { border: [false, true, false, true], style: ['setBlack'], text: '001' },
            { border: [false, true, true, true], style: ['setBlack'], text: '3000' },
          ],
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: 'BASIR AHMED', colSpan: 4 },
            {},
            {},
            {},
            { text: 'PRV A/C NO', colSpan: 2 },
            {},
            { text: 'CONSUMER NO', colSpan: 3 }, {},
            {},
            { style: ['setTitleBold'], text: 'LAST PMNT DATE' },
          ],
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: '20,RAJAKHALI ROAD', colSpan: 4 },
            {},
            {},
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: 'A/5501/47', colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: '23413817', colSpan: 3 }, {},
            {},
            { border: [false, true, true, true], style: ['setBlack'], text: '20/12/2020' },
          ],
          // 

          [
            { text: "TARIFF" },
            { text: "BS.TYPE" },
            { text: "STATUS" },
            { text: "SP.CODE" },
            { text: 'SP VALUE & RULE' },
            { text: 'Meter No' },
            { text: 'Type' },
            { text: 'COND' },
            { text: 'OMF' },
            { text: 'S LOAD(KW)' },
          ],
          [
            { border: [true, true, false, true], style: ['setBlack'], text: "LT-A" },
            { border: [false, true, false, true], style: ['setBlack'], text: "11" },
            { border: [false, true, false, true], style: ['setBlack'], text: "05" },
            { border: [false, true, false, true], style: ['setBlack'], text: "pp" },
            { border: [false, true, false, true], style: ['setBlack'], text: 'A/5501/47' },
            { border: [false, true, false, true], style: ['setBlack'], text: 'meter no' },
            { border: [false, true, false, true], style: ['setBlack'], text: 'type-01' },
            { border: [false, true, false, true], style: ['setBlack'], text: 'c-001' },
            { border: [false, true, false, true], style: ['setBlack'], text: '1.00' },
            { border: [false, true, true, true], style: ['setBlack'], text: '1.00' },
          ],
        ],

      },
      layout: this.setTableBorderColor()
    }
  }

  getMeterUnit() {
    return {
      style: 'margin_Top',
      table: {
        widths: ['*', 70, '*', 70, '*', 70],
        body: [
          [
            { border: [true, true, true, false], text: "PRESENT DATE" },
            { border: [true, true, true, false], style: ['setBlack'], text: "03/2/21" },
            { border: [true, true, true, false], text: "PRESENT RDG" },
            { border: [true, true, true, false], style: ['setBlack'], text: "11510" },
            { border: [true, true, true, false], text: "ARR.FROM" },
            { text: "", rowSpan: 3 },
          ],
          [
            { border: [true, false, true, false], text: "PREVIOUS DATE" },
            { border: [true, false, true, false], style: ['setBlack'], text: "03/1/21" },
            { border: [true, false, true, false], text: "PREVIOUS RDG" },
            { border: [true, false, true, false], style: ['setBlack'], text: "11480" },
            { border: [true, false, true, false], text: "ARR.UPTO" },
            { text: "" },
          ],
          [
            { border: [true, false, true, true], text: "OLD METER UNIT" },
            { border: [true, false, true, true], style: ['setBlack'], text: "0" },
            { border: [true, false, true, true], text: "CONSUMED UNIT" },
            { border: [true, false, true, true], style: ['setBlack'], text: "30" },
            { border: [true, false, true, true], text: "" },
            { text: "" },
          ]
        ]
      },
      layout: this.setTableBorderColor()
    }
  }

  getBillPerMonth() {
    return {
      style: 'margin_Top',
      table: {
        widths: ['*', '*', '*', '*', 40],
        body: [
          [
            { text: "Current Charges", style: ['setRight'], },
            { text: "Taka" },
            { style: ['setRight'], text: "Adjustment/Arrear" },
            { text: "Taka" },
            { text: "" },
          ],
          [
            { border: [true, true, true, false], style: ['setRight'], text: "Electricity Charges" },
            { border: [true, true, true, false], style: ['setRight', 'setBlack'], text: "125" },
            { border: [true, false, true, false], style: ['setRight'], text: "ADJ. Principle" },
            { border: [true, false, true, false], style: ['setRight', 'setBlack'], text: ".50" },
            { svg: '<svg height="100" width="60"><text x="100" y="20" fill="#458BD1" style="font-size:9px;"  transform="rotate(-90,100,100)">Paisa element will be</text><text x="100" y="32" fill="#458BD1" style="font-size:9px;" transform="rotate(-90,100,100)">carried to the next bill</text></svg>', rowSpan: 8 },
          ],
          [
            { border: [true, false, true, false], style: ['setRight'], text: "Demand Charges" },
            { border: [true, false, true, false], style: ['setRight', 'setBlack'], text: "30" },
            { border: [true, false, true, false], style: ['setRight'], text: "ADJ. L.P.S" },
            { border: [true, false, true, false], style: ['setRight', 'setBlack'], text: "00" },
            { text: "" },
          ],
          [
            { border: [true, false, true, false], style: ['setRight'], text: "MINIMUM CHARGES" },
            { border: [true, false, true, false], style: ['setRight', 'setBlack'], text: "30" },
            { border: [true, false, true, false], style: ['setRight'], text: "ADJ. VAT" },
            { border: [true, false, true, false], style: ['setRight', 'setBlack'], text: "00" },
            { text: "" },
          ],
          [
            { border: [true, false, true, false], style: ['setRight'], text: "SERVICE CHARGES" },
            { border: [true, false, true, false], style: ['setRight', 'setBlack'], text: "30" },
            { border: [true, true, true, false], style: ['setRight'], text: "ADV/ARR. PRINCIPLE" },
            { border: [true, true, true, false], style: ['setRight', 'setBlack'], text: "00" },
            { text: "" },
          ],
          [
            { border: [true, true, true, false], style: ['setRight', 'setBold'], text: "PRINCIPLE AMMOUNT", rowSpan: 2 },
            { border: [true, true, true, false], style: ['setRight', 'setBlack'], text: "142.50", rowSpan: 2 },
            { border: [true, false, true, false], style: ['setRight'], text: "CURR.&ARR L.P.S" },
            { border: [true, false, true, false], style: ['setRight', 'setBlack'], text: "00" },
            { text: "" },
          ],
          [
            { text: "" },
            { text: "" },
            { border: [true, false, true, false], style: ['setRight'], text: "ADV./ARR. VAT" },
            { border: [true, false, true, true], style: ['setRight', 'setBlack'], text: "00" },
            { text: "" },
          ],
          [
            { border: [true, false, true, true], style: ['setRight', 'setTitleBold'], text: "(5.000) VAT" },
            { border: [true, false, true, true], style: ['setRight', 'setBlack'], text: "7.00" },
            { border: [true, false, true, false], style: ['setRight', 'setTitleBold'], text: "VAT TOTAL" },
            { border: [true, false, true, true], style: ['setRight', 'setBlack'], text: "13" },
            { text: "" },
          ],
          [
            { text: "Bill PER MONTH", style: ['setRight', 'setTitleBold'], },
            { style: ['setRight', 'setBlack'], text: "195.95" },
            { style: ['setRight', 'setTitleBold'], text: "AMOUNT TO BE PAID" },
            { style: ['setRight', 'setBlack'], text: "149" },
            { text: "" },
          ],
        ]
      },
      layout: this.setTableBorderColor()
    }
  }
  getDuesInformation() {
    return {
      style: 'margin_Top',
      table: {
        widths: [70, '*'],
        body: [
          [
            { border: [true, true, false, true], text: "PAYMENT DETAILS\nARREAR DETAILS\n" },
            { border: [false, true, true, false], style: ['setBlack', 'setLeft'], text: "12/01/21 \t\t\t361.00", margin: [45, 0, 0, 0] },
          ],
          [
            { border: [true, true, true, false], style: ['dueStyle'], text: "বকেয়ার জন্যে সংযোগ বিচ্ছিন্নকরণ নোটিশ", font: 'bangla', colSpan: 2 }, {}
          ],
          [
            { border: [true, false, true, true], style: ['setLeft'], font: 'bangla', fontSize: 7.5, text: "সম্মানিত গ্রাহক,\nআপনার হিসাব নম্বরের বিপরীতে উপরোক্ত বকেয়া পাওনা আছে। জুদি উক্ত বকেয়ার সম্পূর্ণ কিংবা আংশিক এতিমধে পরিশোধ  না করে থাকেন  তবে সংযোগ বিচ্ছিন্নকরণ এড়াতে বিল পরিশোধের সর্বশেষ তারিখ  (LAST PMNT DATE) এর পূর্বে  অত্র দপ্তরে পরিশোধিত বিলের কপি সহ যোগাযোগ করে লেজার হালনাগাদ করার জন্যে অনুরোধ করা যাচ্ছে। উক্ত তারিখের মধ্যে বিল পরিশোধে ব্যথ হলে বিদ্যুৎ আইন অনুযায়ী পরবর্তী ১০ (দশ)  দিন পর থেকে আপনার বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা হবে।  কেবলমাত্র বকেয়া পরিশোধ ও পুনঃসংযোগ  ", colSpan: 2 }, {}
          ],
          [
            { style: ['setTitleBold'], text: "PAY AT\n" },
            {
              border: [true, false, true, true], style: ['setBlack'], text: "\t AGRANI BANK - Chaktai Br.\n"
            }
          ]

        ]
      },
      layout: this.setTableBorderColor()
    }
  }

  getNexPage() {
    return {
      style: 'margin_Top',
      table: {
        widths: ['*', 100, "*"],
        body: [
          [
            { border: [true, true, false, false], text: "" },
            { border: [false, true, false, false], text: "" },
            { border: [false, true, true, false], text: "EXECUTIVE / RESIDENT ENGINEER" }
          ],
          [
            { border: [true, false, false, true], text: 'অপর পৃষ্ঠায় বর্ণিত নির্দেশনাবলী দেখুন', font: 'bangla' },
            { border: [false, false, false, true], text: "Phone:" },
            { border: [false, false, true, true], style: 'setBlack', text: "S & D Patharghata, Ctg." },
          ],

        ]
      },
      layout: this.setTableBorderColor()
    }
  }
  getOfficeCopySection() {
    return {
      table: {
        widths: ['*', 60, 110, "auto", 'auto', 'auto', "auto", "auto"],
        body: [
          // { border: [false, true, true, false], text: "EXECUTIVE / RESIDENT ENGINEER" }
          [
            { border: [true, true, true, false], text: "SERIAL NO" },
            { border: [true, true, true, false], text: "" },
            { text: "LOCATION" },
            { text: "BILLGR" },
            { text: "BOOK NO" },
            { text: "WORD ORD" },
            { text: "BANK" },
            { text: "BRANCH" },
          ],
          [
            { border: [true, false, true, false], text: "RCVD. TK." },
            { border: [true, false, true, false], text: "" },
            { border: [true, true, false, false], style: ['setBlack'], text: "EA" },
            { border: [false, true, false, false], style: ['setBlack'], text: "01" },
            { border: [false, true, false, false], style: ['setBlack'], text: "001" },
            { border: [false, true, false, false], style: ['setBlack'], text: "3000" },
            { border: [false, true, false, false], style: ['setBlack'], text: "04" },
            { border: [false, true, true, false], style: ['setBlack'], text: "2203" },
          ],
          [
            { border: [true, false, true, false], text: "DATE" },
            { border: [true, false, true, false], text: "" },
            { border: [false, false, false, true], style: ['setBlack'], text: "S & D Patharghata, Ctg", colSpan: 2 },
            {},
            { border: [false, false, true, true], style: ['setBlack'], text: "", colSpan: 4 },
            {},
            {},
            {},
          ],
          [
            { border: [true, false, true, true], text: "TARIFF" },
            { border: [true, false, true, true], style: ['setBlack'], text: "LT-A" },
            { text: "CONSUMER NO", colSpan: 2 },
            {},
            { text: "ISSUE DATE", colSpan: 2 },
            {},
            { text: "LAST PMNT DATE", colSpan: 2 },
            {},
          ],
          [
            { border: [true, false, true, false], style: ['setLeft', 'setBlack'], text: "Basir Ahmed", colSpan: 2 },
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: "23413817 \tOLD: A/5501/47", colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: "10/01/21", colSpan: 2 },
            {},
            { border: [false, true, true, true], style: ['setBlack'], text: "20/01/21 ", colSpan: 2 },
            {},
          ],
          [
            { border: [true, false, true, false], style: ['setLeft', 'setBlack'], text: "Uttara", colSpan: 2 },
            {},
            { style: ['setTitleBold'], text: "Bill NO" },
            { style: ['setTitleBold'], text: "CD" },
            { style: ['setTitleBold'], text: "VAT", colSpan: 1 },
            { style: ['setTitleBold'], text: "TOTAL AMOUNT(TK) ", colSpan: 3 },
            {}, {}
          ],
          [
            { border: [true, false, true, false], style: ['setLeft', 'setBlack'], text: "CHAKTAI", colSpan: 2 },
            {},
            { border: [true, true, false, true], style: 'setBlack', text: "24520507" },
            { border: [false, true, false, true], style: 'setBlack', text: "04" },
            { border: [false, true, false, true], style: 'setBlack', text: "13.00", colSpan: 1 },
            { border: [false, true, true, true], style: 'setBlack', text: "274", colSpan: 3 },
            {}, {}
          ],
          [
            { border: [true, false, true, false], style: ['setLeft', 'setBlack'], text: "CHITTAGONG - 4000", colSpan: 2 },
            {},
            { text: "BILL TYPE" },
            { text: "MMYY" },
            { text: "SURCHARGE", colSpan: 1 },
            { text: "Bill NO", colSpan: 2 },
            {},
            { text: "CD" }
          ],
          [
            { text: "CONS NO" },
            { border: [true, true, false, true], style: 'setBlack', text: "23413817" },
            { border: [false, true, false, true], text: "99", style: 'setBlack' },
            { border: [false, true, false, true], text: "Jan-21", style: 'setBlack' },
            { border: [false, true, false, true], text: "0.00", style: 'setBlack', colSpan: 1 },
            { border: [false, true, false, true], text: "24520507", style: 'setBlack', colSpan: 2 },
            {},
            { border: [false, true, true, true], text: "04", style: 'setBlack' }
          ],
        ]
      },
      layout: this.setTableBorderColor()
    }
  }
}
