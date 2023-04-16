package test;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import pages.PageRegistro;
import utils.Navegador;

public class Registro {
	Navegador navegador;
	PageRegistro pageRegistro;

	public Registro() {
		this.navegador = new Navegador();
	}

	@BeforeMethod
	public void beforeTest() throws InterruptedException {
		navegador.inicializarNavegador();
		this.pageRegistro = new PageRegistro(navegador.getDriver());
	}

	@Test (priority = 1)
	public void registrarUsuarioExistente() throws Exception {
		pageRegistro.getBtnRegistrarme().click();
		pageRegistro.getInput("nombre").sendKeys("test");
		pageRegistro.getInput("apellido").sendKeys("test");
		pageRegistro.getInput("usuario").sendKeys("testing");
		pageRegistro.getInput("email").sendKeys("test@undav.com");
		pageRegistro.getInput("Contraseña").sendKeys("testing2022");
		pageRegistro.getBtnRegistrarse().click();

		if(pageRegistro.getValidacionRegistroExistente().isDisplayed()) {
			Reporter.log("No se pudo registrar correctamente porque ya existe usuario y/o mail. - Test OK");
			Assert.assertTrue(true);
		}		
	}
	
	@Test (priority = 2)
	public void registraNuevoUsuario() throws Exception {
		pageRegistro.getBtnRegistrarme().click();
		pageRegistro.getInput("nombre").sendKeys("test");
		pageRegistro.getInput("apellido").sendKeys("test");
		pageRegistro.getInput("usuario").sendKeys("testingQ2022");
		pageRegistro.getInput("email").sendKeys("test22@undav.com");
		pageRegistro.getInput("Contraseña").sendKeys("testing2022");
		pageRegistro.getBtnRegistrarse().click();

		if(pageRegistro.getValidacionRegistro().isDisplayed()) {
			Reporter.log("Registro exitoso - Test OK");
			Assert.assertTrue(true);
		}else {
			Reporter.log("Registro fallido - Test Failed");
			Assert.assertTrue(false);
		}
	}

	@AfterMethod
	public void afterTest() {
		navegador.cerrarNavegador();
	}
}