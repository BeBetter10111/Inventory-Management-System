package iu.wadproject.ims.dto.request;

import lombok.Data;

@Data
public class UpdatePasswordRequest {
    private String newRawPassword;
}