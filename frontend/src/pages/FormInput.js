import React, { useState, useEffect } from "react";

import FormInputPersonal from "../components/FormInputPersonal";
import FormInputLocation from "../components/FormInputLocation";
import FormInputSelectLocationMap from "../components/FormInputSelectLocationMap";
import FormInputContact from "../components/FormInputContact";
import FormInputOther from "../components/FormInputOther";
import useAuth from "../hooks/useAuth";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom"; 
import { getMeApi } from "../api/user";
import 'antd/dist/antd.css';
import '../styles/FormInput.css';
import { Steps } from 'antd';
import { getContactInfo, getLocationInfo, getOtherInfo, getPersonalInfo } from "../api/form";

const { Step } = Steps;

const FormInput = (props) => {
  const {control, formState: {errors}                 
      } = useForm()
  //traigo los valores de las session del usuario y consumo endpoints para valores
  const [renderMap] = useState(0);
  const {auth, logout} = useAuth();
  const [user, setUser] = useState(undefined)
  const [location, setLocation] = useState("")
  const [personal, setPersonal] = useState()
  const [contact, setContact] = useState("")
  const [other, setOther] = useState("")
  const history = useHistory();
   //estado paso actual
   const [current, setCurrent] = useState(0);
   const [goNextForm, setGoNextForm] = useState(false);
   const [goPrevForm, setGoPrevForm] = useState(false);

   const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  
  useEffect(() => {
      if (goNextForm) next();
      setGoNextForm(false)
    }, [goNextForm])

    useEffect(() => {
      if (goPrevForm) prev();
      setGoPrevForm(false)
    }, [goPrevForm])

  useEffect(() => {
    (async() =>{
        const response = await getMeApi(logout)
        setUser(response || null)
    })()
    }, [auth])

    useEffect(() => {
      const locationInfo = getLocationInfo()
      const personalInfo = getPersonalInfo()
      const contactInfo = getContactInfo()
      const otherInfo = getOtherInfo()
      setLocation(JSON.parse(locationInfo))
      setPersonal(JSON.parse(personalInfo))
      setContact(JSON.parse(contactInfo))
      setOther(JSON.parse(otherInfo))
    }, [current])
    
  if(user === undefined) return null

  if(!auth && !user ){
      history.push("/");
      return null
  }
 
  const expresiones = {
	  usuario: /^[a-zA-Z0-9_-]{4,16}$/, 
	  nombre: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, 
	  password: /^.{4,12}$/, 
	  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
	  telefono: /^\d{7,14}$/, 
    fecha: /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/,
    numeros: /^\d+$/
  }


  const step1Content = <FormInputPersonal personalValues={personal} control={control} errors={errors} expresiones={expresiones} goNextForm={(readyToGoNext) => setGoNextForm(readyToGoNext)}/>;
  const step2Content = <FormInputLocation locationValues={location} kmap={renderMap} control={control} errors={errors}  expresiones={expresiones} goNextForm={(readyToGoNext) => setGoNextForm(readyToGoNext)} goPrevForm={(readyToGoPrev) => setGoPrevForm(readyToGoPrev)}/>;
  const step3Content = <FormInputSelectLocationMap goNextForm={(readyToGoNext) => setGoNextForm(readyToGoNext)} goPrevForm={(readyToGoPrev) => setGoPrevForm(readyToGoPrev)}/>;
  const step4Content = <FormInputContact contact={contact} goNextForm={(readyToGoNext) => setGoNextForm(readyToGoNext)} goPrevForm={(readyToGoPrev) => setGoPrevForm(readyToGoPrev)}/>;
  const step5Content = <FormInputOther other={other} goPrevForm={(readyToGoPrev) => setGoPrevForm(readyToGoPrev)}/>;

  const steps = [
    {
      title: 'Información personal',
      content: step1Content,
    },
    {
      title: 'Información de ubicación',
      content: step2Content,
    },
    {
      title: 'Seleccionar ubicación en mapa',
      content: step3Content,
    },
    {
      title: 'Información de contacto',
      content: step4Content,
    },
    {
      title: 'Otra información',
      content: step5Content,
    },
  ];

  return (
    <>
      <div className="tabsContainer">
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content pt-4 pt-md-5">
          {steps[current].content}
        </div>
      </div>
    </>
  );
};
export default FormInput;
