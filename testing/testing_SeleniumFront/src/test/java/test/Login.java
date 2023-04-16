package test;

import org.testng.annotations.Test;

import pages.PageLogin;
import utils.Navegador;

import org.testng.Assert;
import org.testng.Reporter;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class Login {

	Navegador navegador;
	PageLogin pageLogin;
	
	public Login() {
		this.navegador = new Navegador();
	}
	
	@BeforeMethod
	public void beforeTest() throws InterruptedException {
		navegador.inicializarNavegador();
		this.pageLogin = new PageLogin(navegador.getDriver());
	}
	
	@Test (priority = 6)
	public void inicioSesionValido() throws Exception {
		pageLogin.getBtnISesion().click();
		pageLogin.getUsuario().sendKeys("testing");
		pageLogin.getContrasenia().sendKeys("testing2022");
		pageLogin.getBtnIngresar().click();
				
		if(pageLogin.getValidacionLogin().isDisplayed()) {
			Reporter.log("Inicio de sesión exitoso - Test OK");
			Assert.assertTrue(true);
		}		
	}
	
	@Test (priority = 3)
	public void inicioSesionUsuarioInvalido() throws Exception {
		pageLogin.getBtnISesion().click();
		pageLogin.getUsuario().sendKeys("usuarioIncorrecto");
		pageLogin.getContrasenia().sendKeys("testing2022");
		pageLogin.getBtnIngresar().click();
		Thread.sleep(3000);
		
		if(pageLogin.getErrorCredenciales().isDisplayed()) {
			Reporter.log("Inicio de sesión con usuario inválido - Test OK.");
			Assert.assertTrue(true);
		}
	}
	
	@Test (priority = 4)
	public void inicioSesionClaveInvalida() throws Exception {
		pageLogin.getBtnISesion().click();
		pageLogin.getUsuario().sendKeys("testing");
		pageLogin.getContrasenia().sendKeys("claveIncorrecta");
		pageLogin.getBtnIngresar().click();
		Thread.sleep(3000);
		
		if(pageLogin.getErrorCredenciales().isDisplayed()) {
			Reporter.log("Inicio de sesión con clave inválida - Test OK.");
			Assert.assertTrue(true);
		}
	}
		
	@Test (priority = 5)
	public void inicioSesionClaveCorta() throws Exception {
		pageLogin.getBtnISesion().click();
		pageLogin.getUsuario().sendKeys("testing");
		pageLogin.getContrasenia().sendKeys("clave");
		Thread.sleep(3000);
		
		if(pageLogin.getErrorLargoContrasenia().isDisplayed()) {
			Reporter.log("La constraseña no posee el largo solicitado - Test OK.");
			Assert.assertTrue(true);
		}
	}
	
	@Test (priority = 7)
	public void inicioSesionCampoIncompleto() throws Exception {
		pageLogin.getBtnISesion().click();
		pageLogin.getUsuario().sendKeys("testing");
		pageLogin.getContrasenia().sendKeys("");
		pageLogin.getBtnIngresar().click();
		Thread.sleep(3000);
		
		if(pageLogin.getErrorCampoIncompleto().isDisplayed()) {
			Reporter.log("Usuario y/o contraseña sin completar - Test OK.");
			Assert.assertTrue(true);
		}
	}
	
	@AfterMethod
	public void afterTest() {
		navegador.cerrarNavegador();
	}
}