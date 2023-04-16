package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PageFormInfoPersonal {
	WebDriver driver;
	public WebDriverWait wait;

	public PageFormInfoPersonal(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, 30);
	}

	WebElement lista;
	WebElement item;
	WebElement lSubrubros;
	WebElement inputTexto;
	WebElement txtArea;
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
	
	public WebElement getListaSubrubros() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//div[contains(text(), 'Subrubro')]/following::node()")));
			this.lSubrubros = driver.findElement(By.xpath(".//div[contains(text(), 'Subrubro')]/following::node()"));
			return lSubrubros;
		} catch (Exception e) {
			throw new Exception("No se encontró la lista de subrubros.");
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
	
	public WebElement getInputByS() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//textarea[@name='services']")));
			this.txtArea = driver.findElement(By.xpath(".//textarea[@name='services']"));
			return txtArea;
		} catch (Exception e) {
			throw new Exception("No se encontró el input de bienes y servicios.");
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
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//div[contains(@class, 'error selection')]")));
			this.camposIncompletos = driver.findElement(By.xpath(".//div[contains(@class, 'error selection')]"));
			return camposIncompletos;
		} catch (Exception e) {
			throw new Exception("No se encontró el error de campos incompletos.");
		}
	}
}
