package br.edu.utfpr.todo.model;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tb_reading")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Reading extends BasicEntity {
    @Column(name = "date_time", nullable = false)
    private LocalDateTime dateTime;

    @Column(name = "value", nullable = false)
    private double value;

    @Column(name = "unit", nullable = false, length = 10)
    private String unit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sensor_id", nullable = false)
    private Sensor sensor;
}
