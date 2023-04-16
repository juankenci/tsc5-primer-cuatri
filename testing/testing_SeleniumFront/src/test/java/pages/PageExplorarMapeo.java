package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PageExplorarMapeo {
	WebDriver driver;
	public WebDriverWait wait;

	public PageExplorarMapeo(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, 30);
	}

	WebElement lista;
	WebElement item;
	WebElement btnBuscar;
	WebElement btnLimpiar;
	
	public WebElement getLista(String tipoLista) throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//div[@name = '"+tipoLista+"']")));
			this.lista = driver.findElement(By.xpath(".//div[@name = '"+tipoLista+"']"));
			return lista;
		} catch (Exception e) {
			throw new Exception("No se encontró la lista de " + tipoLista);
		}
	}
	
	public WebElement getBtnLimpiar() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[contains(text(),'Limpiar')]")));
			this.btnLimpiar = driver.findElement(By.xpath(".//button[contains(text(),'Limpiar')]"));
			return btnLimpiar;
		} catch (Exception e) {
			throw new Exception("No se encontró el boton limpiar.");
		}
	}
	
	public WebElement getBtnBuscar() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//button[contains(text(),'Buscar')]")));
			this.btnBuscar = driver.findElement(By.xpath("//button[contains(text(),'Buscar')]"));
			return btnBuscar;
		} catch (Exception e) {
			throw new Exception("No se encontró el boton buscar.");
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
}