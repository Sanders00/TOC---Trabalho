package br.edu.utfpr.todo.model;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tb_sensor")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Sensor extends BasicEntity {
    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "location", length = 200)
    private String location;

    @Column(name = "type", nullable = false, length = 50)
    private String type;

    @Column(name = "status", nullable = false)
    private boolean status;

    @Column(name = "installation_date", nullable = false)
    private LocalDate installationDate;

    @OneToMany(mappedBy = "sensor", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Reading> readings;
}
