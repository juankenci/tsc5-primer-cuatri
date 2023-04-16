package pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PagePrincipal {

	WebDriver driver;
	public WebDriverWait wait;

	public PagePrincipal(WebDriver driver) {
		this.driver = driver;
		this.wait = new WebDriverWait(driver, 30);
	}

	WebElement opcFormulario;
	WebElement explorarMapeo;

	public WebElement getBtnIngresarFormulario() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[contains(text(),'Ingresar al Formulario')]")));
			this.opcFormulario = driver.findElement(By.xpath("//button[contains(text(),'Ingresar al Formulario')]"));
			return opcFormulario;
		} catch (Exception e) {
			throw new Exception("No se encontró el botón: Ingresar al formulario.");
		}
	}

	public WebElement getBtnExplorarMapeo() throws Exception {
		try {
			wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(".//button[contains(text(),'Explorar Mapeo')]")));
			this.explorarMapeo = driver.findElement(By.xpath(".//button[contains(text(),'Explorar Mapeo')]"));
			return explorarMapeo;
		} catch (Exception e) {
			throw new Exception("No se encontró el botón: Explorar Mapeo.");
		}
	}
}