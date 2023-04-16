package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PageFormContacto {
	WebDriver driver;
	public WebDriverWait wait;

	public PageFormContacto(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, 30);
	}

	WebElement inputTexto;
	WebElement btnSiguiente;
	WebElement camposIncompletos;

	public WebElement getInput(String xpathInput) throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//input[contains(@name, '"+xpathInput+"')]")));
			this.inputTexto = driver.findElement(By.xpath(".//input[contains(@name, '"+xpathInput+"')]"));
			return inputTexto;
		} catch (Exception e) {
			throw new Exception("No se encontró el input de " + xpathInput);
		}
	}
	
	public WebElement getBtnSiguiente() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[@type='submit']")));
			this.btnSiguiente = driver.findElement(By.xpath(".//button[@type='submit']"));
			return btnSiguiente;
		} catch (Exception e) {
			throw new Exception("No se encontró el botón Siguiente.");
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
