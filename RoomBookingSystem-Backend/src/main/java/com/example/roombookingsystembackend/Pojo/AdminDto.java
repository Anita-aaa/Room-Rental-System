package com.example.roombookingsystembackend.Pojo;


import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AdminDto {

    @NotNull
    private int adminId;

    @NotNull
    private String adminEmail;

    private String otp;

}
