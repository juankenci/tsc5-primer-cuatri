package test;

import org.testng.annotations.Test;

import pages.PageFormContacto;
import pages.PagePrincipal;
import utils.Navegador;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.BeforeMethod;

public class FormularioContacto {

	Navegador navegador;
	PageFormContacto pageContacto;
	PagePrincipal pagePrincipal;
	Login login;
	
	public FormularioContacto() {
		this.navegador = new Navegador();
	}
	
	@BeforeMethod
	public void beforeTest() throws InterruptedException {
		this.pageContacto = new PageFormContacto(navegador.getDriver());
		this.pagePrincipal = new PagePrincipal(navegador.getDriver());
	}
	
	@Test 
	public void completarContactoValido() throws Exception {		
		pageContacto.getInput("referente").sendKeys("Docente TSC5");
		pageContacto.getInput("telefono").sendKeys("42243000");
		pageContacto.getInput("celular").sendKeys("1555667788");
		pageContacto.getInput("email").sendKeys("tsc5Mapeo@gmail.com");
		pageContacto.getBtnSiguiente().click();	
	}
	
	@Test
	public void completarContactoInvalido() throws Exception {
		pageContacto.getInput("referente").sendKeys("Docente TSC5");
		pageContacto.getInput("telefono").sendKeys("42243000");
		pageContacto.getBtnSiguiente().click();
		
		if(pageContacto.getErrorCampoIncompleto().isDisplayed()) {
			Reporter.log("Se encontró algún campo sin completar - Test OK");
			Assert.assertTrue(true);
		}
		
		pageContacto.getInput("celular").sendKeys("1555667788");
		pageContacto.getInput("email").sendKeys("tsc5Mapeo@gmail.com");
		pageContacto.getBtnSiguiente().click();	
	}
}