package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PageFormUbicacion {
	WebDriver driver;
	public WebDriverWait wait;

	public PageFormUbicacion(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, 30);
	}

	WebElement lista;
	WebElement item;
	WebElement inputTexto;
	WebElement btnSiguiente;
	WebElement camposIncompletos;
	WebElement direccionEncontrada;
	
	public WebElement getLista(String tipoLista) throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//div[@name = '"+tipoLista+"']")));
			this.lista = driver.findElement(By.xpath(".//div[@name = '"+tipoLista+"']"));
			return lista;
		} catch (Exception e) {
			throw new Exception("No se encontró la lista de " + tipoLista);
		}
	}
	
	public WebElement getItemLista(String txtItem) throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//span[contains(text(), '"+txtItem+"')]")));
			this.item = driver.findElement(By.xpath(".//span[contains(text(), '"+txtItem+"')]"));
			return item;
		} catch (Exception e) {
			throw new Exception("No se encontró el item de " + txtItem);
		}
	}
	
	public WebElement getInput(String xpathInput) throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//input[contains(@placeholder, '"+xpathInput+"')]")));
			this.inputTexto = driver.findElement(By.xpath(".//input[contains(@placeholder, '"+xpathInput+"')]"));
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

	public WebElement getTxtDireccionEncontrada() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[contains(text(),'¡Encontramos tu dirección!')]")));
			this.direccionEncontrada = driver.findElement(By.xpath("//*[contains(text(),'¡Encontramos tu dirección!')]"));
			return direccionEncontrada;
		} catch (Exception e) {
			throw new Exception("No se encontró el mapa y/o la dirección buscada.");
		}
	}
	
	public WebElement getBtnSiguienteMapa() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[contains(text(), 'Siguiente')]")));
			this.btnSiguiente = driver.findElement(By.xpath(".//button[contains(text(), 'Siguiente')]"));
			return btnSiguiente;
		} catch (Exception e) {
			throw new Exception("No se encontró el botón Siguiente.");
		}
	}
}
