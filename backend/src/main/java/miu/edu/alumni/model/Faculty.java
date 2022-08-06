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
@DiscriminatorValue("faculty")
@SQLDelete(sql = "UPDATE person SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class Faculty extends Person{
    @OneToOne
    @JoinColumn(name="department_id")
    private Department department;
}
