"use client"
import React, { useState } from "react";

export default function Home() {


  const [template, setTemplate] = useState<string>("");
  const [email, setEmail] = useState<{
    no: number,
    email: string,
    status: string
  }[]>([]);


  const fileTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTemplate(e.target?.result as string);
      };
      reader.readAsText(file[0]);
    }
    else {
      console.log("No file")
    }
  }

  const fileEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const textData = e.target?.result as string;
        const arr = textData.split("\n");
        let dataArr = [];
        for (let i = 0; i < arr.length; i++) {
          dataArr.push({
            no: i + 1,
            email: arr[i],
            status: "prepare"
          })
        }
        setEmail([...dataArr]);
        console.log(dataArr)
      };
      reader.readAsText(file[0]);
    }
    else {
      console.log("No file")
    }
  }

  return (
    <React.Fragment>
      <div className="w-[50%] mx-auto mt-[200px]">
        <div className="text-white">ข้อความ</div>
        <div>
          <input type="file" className="" onChange={fileTextChange} />
        </div>
        <textarea className="bg-white rounded-[10px] p-3 w-full" value={template} onChange={(e) => setTemplate(e.target.value)} />

        <div className="text-white">Email</div>
        <div>
          <input type="file" className="" onChange={fileEmailChange} />
        </div>
        <br />
        <div className="max-h-[400px] overflow-y-auto border border-gray-300 rounded-md">
          <table className="w-full">
            <thead className="bg-blue-800 text-white text-center sticky top-0 shadow-md">
              <tr>
                <th className="py-2">#</th>
                <th className="py-2">Email</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {email.map((m, i: number) => (
                <tr key={"email_" + i} className="text-white bg-blue-400 text-center">
                  <td className="py-2">{m.no}</td>
                  <td className="py-2">{m.email}</td>
                  <td className="py-2">{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <div className="text-end text-white">total : {email.length} Email</div>
        <br />
        <div className="text-end text-white">Success total : {email.filter((f) => f.status === "success").length} Email</div>
        <br />
        <br />
        <button className="text-white bg-blue-950 px-3 py-2 rounded-[12px]" type="button">Sendmail</button>
      </div>
    </React.Fragment>
  );
}
