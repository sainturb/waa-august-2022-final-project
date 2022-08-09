package miu.edu.alumni.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import miu.edu.alumni.model.Faculty;
import miu.edu.alumni.model.Student;

@Data
@AllArgsConstructor
public class UserRequest {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String type;
    private String address;
    private String city;
    private String state;
    private String zipCode;

    public Faculty toFaculty() {
        Faculty faculty = new Faculty();
        faculty.setFirstName(this.firstName);
        faculty.setLastname(this.lastName);
        faculty.setEmail(this.email);
        faculty.setAddress(this.address);
        faculty.setCity(this.city);
        faculty.setState(this.state);
        faculty.setZipCode(this.zipCode);
        return faculty;
    }

    public Student toStudent() {
        Student student = new Student();
        student.setFirstName(this.firstName);
        student.setLastname(this.lastName);
        student.setEmail(this.email);
        student.setAddress(this.address);
        student.setCity(this.city);
        student.setState(this.state);
        student.setZipCode(this.zipCode);
        return student;
    }
}
