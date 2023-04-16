package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PageFormOtraInfo {
	WebDriver driver;
	public WebDriverWait wait;

	public PageFormOtraInfo(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, 30);
	}

	WebElement inputTexto;
	WebElement textArea;
	WebElement btnEnviar;
	WebElement camposIncompletos;
	WebElement situacionI;
	WebElement itemSI;

	public WebElement getInput(String xpathInput) throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//input[contains(@name, '"+xpathInput+"')]")));
			this.inputTexto = driver.findElement(By.xpath(".//input[contains(@name, '"+xpathInput+"')]"));
			return inputTexto;
		} catch (Exception e) {
			throw new Exception("No se encontró el input de " + xpathInput);
		}
	}
	
	public WebElement getTextArea(String xpathTArea) throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//textarea[contains(@name, '"+xpathTArea+"')]")));
			this.textArea = driver.findElement(By.xpath(".//textarea[contains(@name, '"+xpathTArea+"')]"));
			return textArea;
		} catch (Exception e) {
			throw new Exception("No se encontró el text area de " + xpathTArea);
		}
	}
	
	public WebElement getBtnEnviar() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[contains(text(),'Enviar')]")));
			this.btnEnviar = driver.findElement(By.xpath(".//button[contains(text(),'Enviar')]"));
			return btnEnviar;
		} catch (Exception e) {
			throw new Exception("No se encontró el botón Enviar.");
		}
	}
	
	public WebElement getSelectSituacionInmueble() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//div[contains(@name,'inmueble')]")));
			this.situacionI = driver.findElement(By.xpath(".//div[contains(@name,'inmueble')]"));
			return situacionI;
		} catch (Exception e) {
			throw new Exception("No se encontró el select de Situación Inmueble.");
		}
	}
	
	public WebElement getItemSInmueble() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//span[contains(text(),'Propio')]")));
			this.itemSI = driver.findElement(By.xpath("//span[contains(text(),'Propio')]"));
			return itemSI;
		} catch (Exception e) {
			throw new Exception("No se encontró el ítem de situacion inmueble.");
		}
	}

	public WebElement getErrorCampoIncompleto() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//input[@aria-invalid='true']")));
			this.camposIncompletos = driver.findElement(By.xpath("//input[@aria-invalid='true']"));
			return camposIncompletos;
		} catch (Exception e) {
			throw new Exception("No se encontró el error de campos incompletos.");
		}
	}
}