package main;

import org.testng.TestNG;

import test.ExplorarMapeo;
import test.Formularios;
import test.Login;
import test.Registro;

public class Main {
	public static void main(String[] args) {
		TestNG testSuite = new TestNG();
		testSuite.setDefaultSuiteName("Suite Economía Popular.");
		testSuite.setTestClasses(new Class[] { Registro.class, Login.class, Formularios.class /*, ExplorarMapeo.class */ });
		testSuite.run();
	}
}