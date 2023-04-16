package test;

import org.testng.annotations.Test;

import pages.PageFormOtraInfo;
import pages.PagePrincipal;
import utils.Navegador;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.BeforeMethod;

public class FormularioOtraInformacion {

	Navegador navegador;
	PageFormOtraInfo pageOInfo;
	PagePrincipal pagePrincipal;
	Login login;
	
	public FormularioOtraInformacion() {
		this.navegador = new Navegador();
	}
	
	@BeforeMethod
	public void beforeTest() throws InterruptedException {
		this.pageOInfo = new PageFormOtraInfo(navegador.getDriver());
		this.pagePrincipal = new PagePrincipal(navegador.getDriver());
	}
	
	@Test 
	public void completarOtraInformacionValida() throws Exception {		
		pageOInfo.getInput("cant_mujeres").sendKeys("3");
		pageOInfo.getInput("cant_hombres").sendKeys("3");
		pageOInfo.getInput("cant_otros").sendKeys("0");
		pageOInfo.getInput("remunerados").sendKeys("4");
		pageOInfo.getInput("voluntarios").sendKeys("2");
		pageOInfo.getInput("cant_trabajadores").sendKeys("5");
		pageOInfo.getTextArea("situacion_espacio_fisico").sendKeys("En condiciones aceptables");
		pageOInfo.getSelectSituacionInmueble().click();
		pageOInfo.getItemSInmueble().click();
		pageOInfo.getTextArea("integra_organizacion_base").sendKeys("Organizacion - ONG Ayuda UNDAV");
		pageOInfo.getTextArea("tiene_subsidio").sendKeys("No");
		pageOInfo.getTextArea("sitio_web").sendKeys("@ONG_UNDAV");
		
		pageOInfo.getBtnEnviar().click();	
	}
	
	@Test
	public void completarOtraInformacionInvalida() throws Exception {
		pageOInfo.getInput("cant_mujeres").sendKeys("3");
		pageOInfo.getInput("cant_hombres").sendKeys("3");
		pageOInfo.getInput("cant_otros").sendKeys("0");
		pageOInfo.getInput("remunerados").sendKeys("4");
		pageOInfo.getInput("voluntarios").sendKeys("2");

		pageOInfo.getBtnEnviar().click();
		
		if(pageOInfo.getErrorCampoIncompleto().isDisplayed()) {
			Reporter.log("Se encontró algún campo sin completar - Test OK");
			Assert.assertTrue(true);
		}	
		
		pageOInfo.getInput("cant_trabajadores").sendKeys("5");
	}
}