package test;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import pages.PagePrincipal;
import utils.Navegador;

public class Formularios {
	Navegador navegador;
	Login login;
	PagePrincipal pagePrincipal;
	FormularioUbicacion ubicacion;
	FormularioContacto contacto;
	FormularioOtraInformacion otraInfo;
	FormularioInfoPersonal infoPersonal;
	
	public Formularios() {
		this.navegador = new Navegador();
	}
	
	@BeforeMethod
	public void beforeTest() throws InterruptedException {
		this.login = new Login();
		login.beforeTest();
		this.pagePrincipal = new PagePrincipal(navegador.getDriver());
		this.ubicacion = new FormularioUbicacion();
		ubicacion.beforeTest();
		this.contacto = new FormularioContacto();
		contacto.beforeTest();
		this.otraInfo = new FormularioOtraInformacion();
		otraInfo.beforeTest();
		this.infoPersonal = new FormularioInfoPersonal();
		infoPersonal.beforeTest();
	}
	
	@Test (priority = 8)
	public void rellenarFormularioCompleto() throws Exception {
		login.inicioSesionValido();
		pagePrincipal.getBtnIngresarFormulario().click();
		
		infoPersonal.completarIPersonalValida();
		
		ubicacion.completarUbicacionValida();
		Thread.sleep(3000);
		ubicacion.pageUbicacion.getBtnSiguienteMapa().click();
	
		contacto.completarContactoValido();
		otraInfo.completarOtraInformacionValida();
	}
	
	/*
	@Test (priority = 9)
	public void rellenarFormularioConDatosIncompletos() throws Exception {
		login.inicioSesionValido();
		pagePrincipal.getBtnIngresarFormulario().click();
		
		infoPersonal.completarIPersonalInvalida();
		
		ubicacion.completarUbicacionInvalida();
		ubicacion.pageUbicacion.getBtnSiguienteMapa().click();
	
		contacto.completarContactoInvalido();
		otraInfo.completarOtraInformacionInvalida();
	}
	*/
	@AfterMethod
	public void afterTest() {
		navegador.cerrarNavegador();
	}
}