package miu.edu.alumni.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserRequest {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
