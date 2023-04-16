package utils;

import io.github.bonigarcia.wdm.WebDriverManager;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class Navegador {

	protected static WebDriver driver;

	public void inicializarNavegador() throws InterruptedException {
		driver = iniciarChrome();
		driver.manage().window().maximize();
		driver.get("http://localhost:3000/");
	}

	private static WebDriver iniciarChrome() {
		ChromeOptions chromeOptions = new ChromeOptions();
		chromeOptions.addArguments("-disable-popup-blocking");
		chromeOptions.setAcceptInsecureCerts(true);
		chromeOptions.setExperimentalOption("excludeSwitches", new String[] {"enable-automation"});
		WebDriverManager.chromedriver().setup();
		driver = new ChromeDriver(chromeOptions);
		return driver;
	}
	
	public void cerrarNavegador() {
		driver.close();
		driver.quit();
	}
	
	public WebDriver getDriver() {
		return driver;
	}
}