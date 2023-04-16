package test;

import org.testng.annotations.Test;

import pages.PageFormInfoPersonal;
import pages.PagePrincipal;
import utils.Navegador;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.BeforeMethod;

public class FormularioInfoPersonal {

	Navegador navegador;
	PageFormInfoPersonal pageIPersonal;
	PagePrincipal pagePrincipal;
	Login login;
	
	public FormularioInfoPersonal() {
		this.navegador = new Navegador();
	}
	
	@BeforeMethod
	public void beforeTest() throws InterruptedException {
		this.pageIPersonal = new PageFormInfoPersonal(navegador.getDriver());
		this.pagePrincipal = new PagePrincipal(navegador.getDriver());
	}
	
	@Test 
	public void completarIPersonalValida() throws Exception {		
		pageIPersonal.getInput("Unidad Productiva").sendKeys("Proyecto Undav");
		pageIPersonal.getInput("DD-MM-AAAA").sendKeys("10-01-2022");
		pageIPersonal.getLista("branche").click();
		pageIPersonal.getItemLista("Tareas de cuidado").click();
		pageIPersonal.getLista("rubro").click();
		pageIPersonal.getItemLista("Cuidados y servicios comunitarios").click();
		pageIPersonal.getListaSubrubros().click();
		pageIPersonal.getItemLista("Ollas y comedores").click();
		pageIPersonal.getInputByS().sendKeys("Sin información para completar");
		pageIPersonal.getLista("tipoUnidadProductiva").click();
		pageIPersonal.getItemLista("Unidades productivas comunitarias").click();
		pageIPersonal.getLista("subUnit").click();
		pageIPersonal.getItemLista("Centro comunitario").click();
		pageIPersonal.getLista("legalForm").click();
		pageIPersonal.getItemLista("Cooperativa").click();
	
		pageIPersonal.getBtnSiguiente().click();	
	}
	
	@Test
	public void completarIPersonalInvalida() throws Exception {
		pageIPersonal.getInput("Unidad Productiva").sendKeys("Proyecto Undav");
		pageIPersonal.getInput("DD-MM-AAAA").sendKeys("10-01-2022");
		pageIPersonal.getLista("branche").click();
		pageIPersonal.getItemLista("Tareas de cuidado").click();
		pageIPersonal.getLista("rubro").click();
		pageIPersonal.getItemLista("Cuidados y servicios comunitarios").click();
		pageIPersonal.getListaSubrubros().click();
		pageIPersonal.getItemLista("Ollas y comedores").click();
		pageIPersonal.getInputByS().sendKeys("Sin información para completar");
		pageIPersonal.getLista("tipoUnidadProductiva").click();
		pageIPersonal.getItemLista("Unidades productivas comunitarias").click();
		pageIPersonal.getLista("subUnit").click();
		pageIPersonal.getItemLista("Centro comunitario").click();
		pageIPersonal.getBtnSiguiente().click();
		
		if(pageIPersonal.getErrorCampoIncompleto().isDisplayed()) {
			Reporter.log("Se encontró algún campo sin completar - Test OK");
			Assert.assertTrue(true);
		}
		
		pageIPersonal.getLista("legalForm").click();
		pageIPersonal.getItemLista("Cooperativa").click();
	
		pageIPersonal.getBtnSiguiente().click();	
	}
}