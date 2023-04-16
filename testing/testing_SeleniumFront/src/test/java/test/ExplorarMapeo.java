package test;

import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import pages.PageExplorarMapeo;
import pages.PagePrincipal;
import utils.Navegador;

public class ExplorarMapeo {
	Navegador navegador;
	PageExplorarMapeo pageExplorarMapeo;
	PagePrincipal pagePrincipal;
	Login login;
	
	public ExplorarMapeo() {
		this.navegador = new Navegador();
	}
	
	@BeforeMethod
	public void beforeTest() throws InterruptedException {
		this.login = new Login();
		login.beforeTest();
		this.pageExplorarMapeo = new PageExplorarMapeo(navegador.getDriver());
		this.pagePrincipal = new PagePrincipal(navegador.getDriver());
	}
	
	@Test (priority = 9)
	public void explorarMapeo() throws Exception {
		login.inicioSesionValido();		
		pagePrincipal.getBtnExplorarMapeo().click();
		Thread.sleep(3000);
		pageExplorarMapeo.getLista("branche").click();
		Thread.sleep(1000);
		pageExplorarMapeo.getItemLista("Comercio").click();
		
		pageExplorarMapeo.getLista("rubro").click();
		Thread.sleep(1000);
		pageExplorarMapeo.getItemLista("Gastronomía").click();
		
		pageExplorarMapeo.getLista("pais").click();
		Thread.sleep(1000);
		pageExplorarMapeo.getItemLista("Argentina").click();
		
		pageExplorarMapeo.getLista("provincia").click();
		Thread.sleep(1000);
		pageExplorarMapeo.getItemLista("Buenos Aires").click();

		pageExplorarMapeo.getLista("localidad").click();
		Thread.sleep(1000);
		pageExplorarMapeo.getItemLista("Avellaneda").click();
		
		pageExplorarMapeo.getBtnBuscar().click();
		Thread.sleep(5000);
		
		pageExplorarMapeo.getBtnLimpiar();
		Thread.sleep(3000);
	}
	
	@AfterMethod
	public void afterTest() {
		navegador.cerrarNavegador();
	}
}