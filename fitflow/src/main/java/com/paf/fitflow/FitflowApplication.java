package com.paf.fitflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;


@SpringBootApplication
@RestController
public class FitflowApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitflowApplication.class, args);
	}

}
