package miu.edu.alumni.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;
    private String tag;

    @ManyToOne
    @JoinColumn(name="advertisement_id")
    private JobAdvertisement advertisement;

    @ManyToOne
    @JoinColumn(name="history_id")
    private JobHistory history;
}
