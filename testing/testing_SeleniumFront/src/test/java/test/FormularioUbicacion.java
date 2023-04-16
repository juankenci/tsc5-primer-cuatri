package test;

import org.testng.annotations.Test;

import pages.PageFormUbicacion;
import pages.PagePrincipal;
import utils.Navegador;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.BeforeMethod;

public class FormularioUbicacion {

	Navegador navegador;
	PageFormUbicacion pageUbicacion;
	PagePrincipal pagePrincipal;
	Login login;
	
	public FormularioUbicacion() {
		this.navegador = new Navegador();
	}
	
	@BeforeMethod
	public void beforeTest() throws InterruptedException {
		this.pageUbicacion = new PageFormUbicacion(navegador.getDriver());
		this.pagePrincipal = new PagePrincipal(navegador.getDriver());
	}
	
	@Test
	public void completarUbicacionValida() throws Exception {	
		pageUbicacion.getLista("pais").click();
		Thread.sleep(1000);
		pageUbicacion.getItemLista("Argentina").click();
		
		pageUbicacion.getLista("provincia").click();
		Thread.sleep(1000);
		pageUbicacion.getItemLista("Buenos Aires").click();
		
		pageUbicacion.getLista("localidad").click();
		Thread.sleep(1000);
		pageUbicacion.getItemLista("Avellaneda").click();
		
		pageUbicacion.getLista("municipio").click();
		Thread.sleep(1000);
		pageUbicacion.getItemLista("PIÑEYRO").click();
		
		pageUbicacion.getInput("calle").sendKeys("Mario Bravo");
		pageUbicacion.getInput("número").sendKeys("1460");
		pageUbicacion.getInput("barrio").sendKeys("Piñeyro");

		Thread.sleep(5000);
		
		pageUbicacion.getInput("Entre calles").sendKeys("Isleta y Paso de la Patria");
		pageUbicacion.getBtnSiguiente().click();
				
		if(pageUbicacion.getTxtDireccionEncontrada().isDisplayed()) {
			Reporter.log("Formulario ubicación completado correctamente - Test OK");
			Assert.assertTrue(true);
		}
	}
	
	@Test
	public void completarUbicacionInvalida() throws Exception {	
		pageUbicacion.getLista("pais").click();
		pageUbicacion.getItemLista("Argentina").click();
		
		pageUbicacion.getLista("provincia").click();
		pageUbicacion.getItemLista("Buenos Aires").click();
		
		pageUbicacion.getLista("localidad").click();
		pageUbicacion.getItemLista("Avellaneda").click();
		
		pageUbicacion.getLista("municipio").click();
		pageUbicacion.getItemLista("PIÑEYRO").click();
		
		pageUbicacion.getInput("calle").sendKeys("Mario Bravo");
		pageUbicacion.getInput("número").sendKeys("1460");
		
		pageUbicacion.getBtnSiguiente().click();
		
		Thread.sleep(3000);
		
		if(pageUbicacion.getErrorCampoIncompleto().isDisplayed()) {
			Reporter.log("Se encontró algún campo sin completar - Test OK");
			Assert.assertTrue(true);
		}
		
		pageUbicacion.getInput("barrio").sendKeys("Piñeyro");
		pageUbicacion.getInput("Entre calles").sendKeys("Isleta y Paso de la Patria");
		pageUbicacion.getBtnSiguiente().click();
	}
}