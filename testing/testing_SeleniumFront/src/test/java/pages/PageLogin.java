package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PageLogin {
	WebDriver driver;
	public WebDriverWait wait;

	public PageLogin(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, 30);
	}

	WebElement btnISesion;
	WebElement usuario;
	WebElement contrasenia;
	WebElement btnIngresar;
	WebElement miCuenta;
	WebElement errorCredenciales;
	WebElement errorContrasenia;
	WebElement campoIncompleto;

	public WebElement getBtnISesion() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[contains(text(), 'Iniciar Sesión')]")));
			this.btnISesion = driver.findElement(By.xpath(".//button[contains(text(), 'Iniciar Sesión')]"));
			return btnISesion;
		} catch (Exception e) {
			throw new Exception("No se encontró el botón: Inicio de Sesión.");
		}
	}

	public WebElement getUsuario() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//input[@name = 'user']")));
			this.usuario = driver.findElement(By.xpath(".//input[@name = 'user']"));
			return usuario;
		} catch (Exception e) {
			throw new Exception("No se encontró el campo: Usuario.");
		}
	}

	public WebElement getContrasenia() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//input[@id= 'password']")));
			this.contrasenia = driver.findElement(By.xpath(".//input[@id= 'password']"));
			return contrasenia;
		} catch (Exception e) {
			throw new Exception("No se encontró el campo: Contraseña.");
		}
	}

	public WebElement getBtnIngresar() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[@type= 'submit']")));
			this.btnIngresar = driver.findElement(By.xpath(".//button[@type= 'submit']"));
			return btnIngresar;
		} catch (Exception e) {
			throw new Exception("No se encontró el campo: Iniciar Sesión - El que me loguea.");
		}
	}

	public WebElement getValidacionLogin() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//button[contains(text(),'Mi cuenta')]")));
			this.miCuenta = driver.findElement(By.xpath("//button[contains(text(),'Mi cuenta')]"));
			return miCuenta;
		} catch (Exception e) {
			throw new Exception("No se encontró el botón: Mi Cuenta.");
		}
	}

	public WebElement getErrorCredenciales() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//div[contains(text(),'Credenciales no válidas')]")));
			this.errorCredenciales = driver.findElement(By.xpath(".//div[contains(text(),'Credenciales no válidas')]"));
			return errorCredenciales;
		} catch (Exception e) {
			throw new Exception("No se encontró el texto: Credenciales no válidas.");
		}
	}

	public WebElement getErrorLargoContrasenia() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//div[contains(text(),'La contraseña debe tener 8 caracteres')]")));
			this.errorContrasenia = driver.findElement(By.xpath(".//div[contains(text(),'La contraseña debe tener 8 caracteres')]"));
			return errorContrasenia;
		} catch (Exception e) {
			throw new Exception("No se encontró el error de largo de contraseña.");
		}
	}
	
	public WebElement getErrorCampoIncompleto() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//input[@class='form-control is-invalid']")));
			this.campoIncompleto = driver.findElement(By.xpath(".//input[@class='form-control is-invalid']"));
			return campoIncompleto;
		} catch (Exception e) {
			throw new Exception("No se encontró el error de usuario y/o contraseña incompleto.");
		}
	}
}