package iu.wadproject.ims.dto.request;

import iu.wadproject.ims.entity.enums.RoleType;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String fullName;
    private String email;
    private String phoneNumber;
    private RoleType roleType;
}