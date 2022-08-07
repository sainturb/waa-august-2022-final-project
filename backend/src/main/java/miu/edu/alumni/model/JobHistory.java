package miu.edu.alumni.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;

@Entity
@Data
public class JobHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String companyName;
    private Instant startDate;
    private Instant endDate;
    private String reasonToLeave;
    private String comments;

    @OneToMany(mappedBy="history")
    private List<Tag> tags;
}
