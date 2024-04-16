package com.example.ServiceDiscovary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ServiceDiscovaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceDiscovaryApplication.class, args);
	}

}
