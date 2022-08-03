package miu.edu.alumni.model;

import lombok.Data;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Data
@DiscriminatorValue("faculty")
public class Faculty extends Person{
    @OneToOne
    @JoinColumn(name="department_id")
    private Department department;
}
