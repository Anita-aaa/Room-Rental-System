package com.example.roombookingsystembackend.Pojo;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class StudentDto {

    @NotNull
    private Integer studentId;

    @NotNull
    private String studentFullName;

    @NotNull
    private String studentAddress;

    @NotNull
    private long studentNumber;

    @NotNull
    private String studentEmail;

    @NotNull
    private String studentPassword;

    private String otp;

    private MultipartFile citizenshipFront;

    private MultipartFile citizenshipBack;

    private String citizenshipFrontString;

    private String citizenshipBackString;
}
