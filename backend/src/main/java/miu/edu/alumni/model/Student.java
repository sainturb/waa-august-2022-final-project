package miu.edu.alumni.model;

import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Data
@DiscriminatorValue("student")
@SQLDelete(sql = "UPDATE person SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class Student extends Person {
    @OneToOne
    @JoinColumn(name="major_id")
    private Department major;
    private Float gpa;
}
