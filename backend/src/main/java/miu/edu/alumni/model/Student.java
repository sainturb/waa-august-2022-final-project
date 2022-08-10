package miu.edu.alumni.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@DiscriminatorValue("student")
@SQLDelete(sql = "UPDATE person SET is_deleted = true WHERE id=?")
@Where(clause = "is_deleted=false")
public class Student extends Person {
    @OneToOne
    @JoinColumn(name="major_id")
    private Department major;
    private Double gpa;

    @ManyToMany(mappedBy = "applied", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<JobAdvertisement> appliedTo;
}
