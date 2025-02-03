"use client"
import { MAIL } from "@/utils/email";
import React, { useState } from "react";

export default function Home() {


  const [template, setTemplate] = useState<string>("");
  const [email, setEmail] = useState<{
    no: number,
    email: string,
    status: string
  }[]>([]);

  const [onProgress, setOnProgress] = useState<boolean>(false);


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

  const sendMail = async () => {
    if (!onProgress) {
      setOnProgress(true)
      for (let i = 0; i < email.length; i++) {
        let arrMail = [...email]
        try {
          const res = await fetch("/api/mail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email[i].email,
              text: template
            })
          })
          const resJson = await res.json()
          if (resJson.statusCode === 200) {
            arrMail[i].status = "success";
          } else {
            arrMail[i].status = "fail";
          }
          setEmail([...arrMail]);

        } catch (error) {

          arrMail[i].status = "fail";
          setEmail([...arrMail]);

        }

      }
      setOnProgress(false)
    }
  }

  return (
    <React.Fragment>
      <div className="w-[50%] mx-auto my-[100px]">
        <div className="text-white text-center text-bold text-[30px]">Email Sender</div>

        <div className="text-white">ข้อความ</div>
        <div>
          <input type="file" className="" onChange={fileTextChange} />
        </div>
        <textarea className="bg-white rounded-[10px] p-3 w-full" rows={5} value={template} onChange={(e) => setTemplate(e.target.value)} />
        {/* <div className="">{template}</div> */}
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
                  <td className="py-2">
                    <div className={`px-2 py-1 rounded-[10px]  ${m.status === "prepare" ? " bg-slate-700 text-white " : (m.status === "success" ? " bg-green-700 text-white " : " bg-red-700 text-white ")} `}>{m.status}</div></td>
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
        <div className="flex justify-end">

          <button className="text-white bg-blue-700 px-3 py-2 rounded-[12px] text-[20px] text-bold" type="button" disabled={onProgress} onClick={sendMail}>{onProgress ? "Sending ... " : "Sendmail"}</button>
        </div>
      </div>
    </React.Fragment>
  );
}
