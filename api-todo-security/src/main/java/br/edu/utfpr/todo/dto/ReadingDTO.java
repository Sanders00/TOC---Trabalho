package br.edu.utfpr.todo.dto;

import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReadingDTO {
    @NotNull
    private LocalDateTime dateTime;

    @NotNull
    private Double value;

    @NotBlank
    private String unit;

    @NotNull
    private String sensorId;
}
