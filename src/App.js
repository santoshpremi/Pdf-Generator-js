import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import moment from "moment/moment";


export default function App() {
  const generatePDF = () => {

    let doc = new jsPDF();

    let users = [
      {
        name: 'John',
        age: 25,
      },
      {
        name: 'Smith',
        age: 30,
      },
    ];

    let info = [];

    users.forEach((element, index, array) => {
      info.push([element.name, element.age, element.country]);
    });

    doc.autoTable({
      head: [['Name', 'Age']],
      body: info,
    });

    doc.save('output.pdf');
    console.log('this is click', info);
  };
  const exportCSV = () => {
    // e.preventDefault();

    const titleText = 'hello';

    let csvUsers = [  
      [' 2022-10-01 02:15:00', 'Singer'],  
      ['2022-10-01 02:15:00', 'Footballer'],  
      ['2022-10-01 02:15:00', 'Badminton Player']
   
   ];  

    let textToSave = 'dateTime,value\n';
    csvUsers.forEach((d, index) => {
      let datetime = moment.utc(d[0]).format('MM/DD/YYYY HH:mm:ss.SSS'),
        value = !!d[1] || d[1] === 0 ? d[1] : '';
      textToSave = textToSave.concat(datetime + ', ' + value + '\n');
      // return textToSave;
      // textToSave += d.join(',');
      // textToSave += "\n";
      // return textToSave;

    });

    let hiddenElement = document.createElement('a');
    document.body.appendChild(hiddenElement);
    let csvData = new Blob([textToSave], { type: 'text/csv' });
    hiddenElement.href = URL.createObjectURL(csvData);
    // hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = titleText + '.csv';
    hiddenElement.click();
  };

  return (
    <div>
      <button  onClick={() => generatePDF()}>Download PDF</button>
      <button onClick={() => exportCSV()}>Download CSV</button>
    </div>
  );
}
