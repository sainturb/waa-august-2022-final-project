package miu.edu.alumni.model;

import lombok.Data;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Data
@DiscriminatorValue("student")
public class Student extends Person {
    @OneToOne
    @JoinColumn(name="major_id")
    private Department major;
    private Float gpa;
}
