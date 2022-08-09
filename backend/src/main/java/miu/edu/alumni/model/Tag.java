package miu.edu.alumni.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;

    @ManyToMany(mappedBy="tags", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<JobAdvertisement> advertisements= new ArrayList<>();


    @ManyToMany(mappedBy="tags", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<JobHistory> histories = new ArrayList<>();

    @Override
    public String toString() {
        return "Tag{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
