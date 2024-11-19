package br.edu.utfpr.todo.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SensorDTO {
    @NotBlank
    private String name;

    private String location;

    @NotBlank
    private String type;

    @NotNull
    private Boolean status;

    @NotNull
    private LocalDate installationDate;
}
