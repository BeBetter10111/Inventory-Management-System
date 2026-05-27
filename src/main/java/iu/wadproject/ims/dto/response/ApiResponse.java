package iu.wadproject.ims.dto.response;

import lombok.*;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
public class ApiResponse {
    private String message;
    private Object data;
}