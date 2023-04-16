package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PageRegistro {
	WebDriver driver;
	public WebDriverWait wait;

	public PageRegistro(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, 30);
	}
	WebElement texto;
	WebElement btnRegistrarme;
	WebElement btnRegistrarse;
	WebElement miCuenta;
	WebElement registroExistente;

	public WebElement getInput(String xpathInput) throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//input[contains(@placeholder, '"+xpathInput+"')]")));
			this.texto = driver.findElement(By.xpath(".//input[contains(@placeholder, '"+xpathInput+"')]"));
			return texto;
		} catch (Exception e) {
			throw new Exception("No se encontr� el input de " + xpathInput);
		}
	}

	public WebElement getBtnRegistrarme() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[contains(text(), 'Registrarme')]")));
			this.btnRegistrarme = driver.findElement(By.xpath(".//button[contains(text(), 'Registrarme')]"));
			return btnRegistrarme;
		} catch (Exception e) {
			throw new Exception("No se encontr� el bot�n: Registrarme.");
		}
	}	

	public WebElement getBtnRegistrarse() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[contains(text(), 'Registrarse')]")));
			this.btnRegistrarse = driver.findElement(By.xpath(".//button[contains(text(), 'Registrarse')]"));
			return btnRegistrarse;
		} catch (Exception e) {
			throw new Exception("No se encontr� el bot�n: Registrarse.");
		}
	}

	public WebElement getValidacionRegistro() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[contains(text(),'Mi cuenta')]")));
			this.miCuenta = driver.findElement(By.xpath(".//button[contains(text(),'Mi cuenta')]"));
			return miCuenta;
		} catch (Exception e) {
			throw new Exception("No se encontr� el bot�n: Mi Cuenta.");
		}
	}
	
	public WebElement getValidacionRegistroExistente() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//div[contains(text(),'Usuario y/o mail ya registrados')]")));
			this.registroExistente = driver.findElement(By.xpath(".//div[contains(text(),'Usuario y/o mail ya registrados')]"));
			return registroExistente;
		} catch (Exception e) {
			throw new Exception("No se encontr� el texto: Usuario y/o mail ya registrados.");
		}
	}
}