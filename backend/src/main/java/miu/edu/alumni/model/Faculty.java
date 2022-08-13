package miu.edu.alumni.model;

import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Entity
@Data
@DiscriminatorValue("faculty")
@SQLDelete(sql = "UPDATE person SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class Faculty extends Person{
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="department_id")
    private Department department;
}
