import { Component } from '@angular/core';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss']
})

export class CameraComponent {

    updateServo(servo: number, direction: string) {
        
        console.log(servo + "-" + direction)

        const url = `http:// 192.168.0.94:81/moveServo?dir=${servo}&delta=${direction}`;
        fetch(url)
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
}