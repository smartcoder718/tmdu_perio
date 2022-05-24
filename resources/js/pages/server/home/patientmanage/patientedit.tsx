import React, { useState, useEffect } from "react";
import Button from "../../../../components/button";
import { Route, Routes, NavLink, Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useAppDispatch, useAppSelector } from '../../../.././redux/hooks'
import { changedata, changedate } from '../../../.././redux/reducers/dataslice'
import AdminDefaultButton from "../../../../components/adminbutton";
import { BRESH_TIME, BRESH_TOOL, MO_STATUS,PROGRAM} from "../../../../redux/type";

const PatientEdit = () => {
    const data = useAppSelector((state) => state.data.value);
    const index = useAppSelector((state) => state.index.value);
    const selectuser = useAppSelector((state) => state.user.value)[index];
    const dispatch = useAppDispatch();
    const [navindex, setNavindex] = useState(1);
    const [password, resetPassword]=useState(selectuser.midpass);
    const [info,setInfo]=useState(selectuser.info);
    const getUserdata = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            axios.get(`/api/admin/getuserdata?userid=` + selectuser.id + `&page=` + navindex, config).then((response: AxiosResponse) => {
                if (response.data["success"] == true) {
                    dispatch(changedata(response.data["data"][0]["data"]));
                } else {
                }
            });
        }
        catch (err) {

        }
    }
    const getDate=(date:string, time:string)=>{
        return date.split("-")[0]+"."+date!.split("-")[1]+"."+date!.split("-")[2]+" "+(time.split(":")[0].substring(0,1)=="0"?time.split(":")[0].substring(1):time.split(":")[0])+":"+time.split(":")[1];
    }
    const getstate=(value:string)=>{
        return (Number(value!.split("|")[1])==0?"":"歯磨き"+BRESH_TIME[Number(value!.split("|")[1])-1])
        +((Number(value!.split("|")[0].split(',')[0]))==1?", "+BRESH_TOOL[0]:"")
        +((Number(value!.split("|")[0].split(',')[1]))==1?", "+BRESH_TOOL[1]:"")
        +((Number(value!.split("|")[0].split(',')[2]))==1?", "+BRESH_TOOL[2]:"")
    }

    useEffect(() => {
        getUserdata();
    }, [])
    const resetPass=()=>{

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body=JSON.stringify({"id":selectuser.id});
        try{
            axios.post('/api/admin/clientresetpass',body,config).then((response:AxiosResponse)=>{
                if(response.data["success"]==true){
                    resetPassword(response.data["password"]);
                }else{

                }
            });
        }
        catch(err){

        }
    }
    const resetInfo=()=>{

        const config={
            headers:{
                'Content-Type':'application/json'
            }
        };
        const body=JSON.stringify({"id":selectuser.id,"info":info});
        try{
            axios.post('/api/admin/clientresetInfo',body,config).then((response:AxiosResponse)=>{
                if(response.data["success"]==true){
                    window.alert("success");
                }else{

                }
            });
        }
        catch(err){

        }
    }
    return (
        <div className="min-h-screen h-full overflow-hidden ml-[60px] flex flex-basis">
            <div className="basis-1/4 bg-white  px-[20px] pt-[54px]">
                <div className="flex items-center mb-[20px] ">
                    <p className="text-[24px] font-bold mr-[20px]">
                        患者情報
                    </p>
                   <NavLink to="../patientinfoedit">
                        <AdminDefaultButton text="編集" buttonClick={() => { }} />
                   </NavLink>
                </div>
                <table className="">
                    <tbody>
                        <tr>
                            <td className="pb-[22px] text-right">
                                <p className="text-[16px] font-bold pr-[56px]">
                                    診察券番号
                                </p>
                            </td>
                            <td className="pb-[22px]">
                                <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{selectuser.ticketid}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-[22px] text-right">
                                <p className="text-[16px] font-bold pr-[56px]">
                                    患者氏名
                                </p>
                            </td>
                            <td className="pb-[22px]">
                                <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{selectuser.name}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="pb-[22px] text-right">
                                <p className="text-[16px] font-bold pr-[56px] ">
                                    ID
                                </p>
                            </td>
                            <td className="pb-[22px]">
                                <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{selectuser.userid}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-right">
                                <p className="text-[16px] font-bold pr-[56px] ">
                                    パスワード
                                </p>
                            </td>
                            <td>
                                <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{password}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex flex-row-reverse">
                    <AdminDefaultButton text="パスワードを再発行する" buttonClick={resetPass} />
                </div>
                <p className="text-[16px] font-bold pt-[56px] pb-[8px]">
                    患者メモ
                </p>
                <textarea onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>{setInfo(e.target.value);}} value={info==null?"":info!} className="pb-[15px] resize-none font-[13px] p-[15px] bg-textareaColor border-2 border-adminborderColor w-full" rows={13} placeholder="Your message"  />
                <div className="flex flex-row-reverse">
                    <AdminDefaultButton text="保存" buttonClick={resetInfo} />
                </div>
            </div>
            <div className="basis-3/4 ml-[20px]  mt-[20px] flex flex-col">
                <div className="bg-white w-full  pl-[68px]">
                    <div className="flex items-center mb-[37px] ">
                        <p className="text-[24px] font-bold mr-[20px]">
                            サマリー
                        </p>
                        <NavLink to="../treatset">
                            <AdminDefaultButton text="治療設定" buttonClick={() => { }} />
                        </NavLink>
                    </div>
                    <div className="flex items-center pb-[55px]">
                        <p className="text-[16px] font-bold pr-[79px]">
                            初回セルフ検査日
                        </p>
                        <p className="text-[16px] font-bold text-responseColor tracking-[.25em]  pr-[100px]">{selectuser.firstcheck}</p>
                        <p className="text-[16px] font-bold pr-[79px]">
                            セルフケアタイプ
                        </p>
                        <p className="text-[16px] font-bold text-responseColor tracking-[.25em]">{PROGRAM[Number(selectuser.type)-2]}</p>
                    </div>
                </div>
                <div className="mt-[20px] h-full bg-white px-[68px] shrink">
                    <div className="flex items-center mb-[37px] ">
                        <p className="text-[24px] font-bold mr-[20px]">
                            実施ログ
                        </p>
                        <AdminDefaultButton text="csvDL" buttonClick={() => { }} />
                        {/* <p className="right-0">
                            1
                        </p> */}
                    </div>
                    <table className=" w-full">
                        <tbody>
                            <tr className="text-left text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor">
                                <th className="pl-[90px] py-[12px]">
                                    記録日時
                                </th>
                                <th className=" py-[12px]">
                                    記録の種類
                                </th>
                                <th className=" py-[12px]">
                                    記録内容
                                </th>
                                <th className=" py-[12px]">
                                    添付画像
                                </th>
                            </tr>
                            {
                                data && data.map((v, index) => {
                                    switch (v.type) {
                                        case 1: return <>
                                            <tr  className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                                <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!,v.time)}</td>
                                                <td>起床</td>
                                                <td >
                                                    <p className="py-[10px]"></p>
                                                </td>
                                                <td className="py-[22px] text-right">

                                                </td>
                                            </tr>
                                            <tr key={index} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                                <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!,v.time)}</td>
                                                <td>朝のお口の状態</td>
                                                <td >
                                                    <p className="py-[10px]">{MO_STATUS[Number(v.value!)-1]}</p>
                                                </td>
                                                <td className="py-[22px] text-right">
                                                </td>
                                            </tr>
                                        </>
                                        case 2: return <tr key={index} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                            <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!,v.time)}</td>
                                            <td>歯磨き記録</td>
                                            <td >
                                                <p className="py-[10px]">{getstate(v.value!)}</p>
                                            </td>
                                            <td className="py-[22px] text-right">

                                            </td>
                                        </tr>
                                        case 3: return <tr key={index} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                            <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!,v.time)}</td>
                                            <td>食事の記録</td>
                                            <td >
                                                <p className="py-[10px]">{v.value!.split("|")[0]}</p>
                                            </td>
                                            <td className="py-[22px] text-right">
                                                <img src={v.value!.split("|")[1]} className="w-[195px] h-auto py-4"></img>
                                            </td>
                                        </tr>
                                        case 4: return <tr key={index} className="text-[#555555] text-[16px] font-bold border-b-[1px] border-b-adminborderColor ">
                                            <td className="pl-[90px] tracking-[.15em]">{getDate(v.date!,v.time)}</td>
                                            <td>就寝</td>
                                            <td >
                                                <p className="py-[10px]"></p>
                                            </td>
                                            <td className="py-[22px] text-right">
                                                <img src="../../../images/bresh-none.svg" />
                                            </td>
                                        </tr>
                                    }
                                }
                                )

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PatientEdit;