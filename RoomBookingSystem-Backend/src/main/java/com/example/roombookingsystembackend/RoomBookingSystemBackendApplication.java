package com.example.roombookingsystembackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class RoomBookingSystemBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(RoomBookingSystemBackendApplication.class, args);
    }

}

//
//package com.GyanSarathi.Margadarshan;
//
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
//
//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
//public class MargadarshanApplication {
//
//    public static void main(String[] args) {
//        SpringApplication.run(MargadarshanApplication.class, args);
//    }

//}
