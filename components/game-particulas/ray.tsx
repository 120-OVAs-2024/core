import { useEffect, useRef } from "react";

import css from "./ray.module.css"
interface LightningPath {
    x: number;
    y: number;
}

interface Lightning {
    x: number;
    y: number;
    xRange: number;
    yRange: number;
    path: LightningPath[];
    pathLimit: number;
    canSpawn: boolean;
    hasFired: boolean;
}

export const Ray: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let cw = window.innerWidth;
        let ch = window.innerHeight;
        canvas.width = cw;
        canvas.height = ch;

        const lightning: Lightning[] = [];
        let lightTimeCurrent = 0;
        let lightTimeTotal = 10;

        const rand = (rMi: number, rMa: number) => Math.floor(Math.random() * (rMa - rMi + 1) + rMi);
        const createL = (x: number, y: number, canSpawn: boolean) => {
            lightning.push({
                x,
                y,
                xRange: rand(5, 30),
                yRange: rand(5, 25),
                path: [{ x, y }],
                pathLimit: rand(10, 35),
                canSpawn,
                hasFired: false,
            });
        };

        const updateL = () => {
            for (let i = lightning.length - 1; i >= 0; i--) {
                const light = lightning[i];

                light.path.push({
                    x: light.path[light.path.length - 1].x + (rand(0, light.xRange) - light.xRange / 2),
                    y: light.path[light.path.length - 1].y + rand(0, light.yRange),
                });

                if (light.path.length > light.pathLimit) {
                    lightning.splice(i, 1);
                }
                light.hasFired = true;
            }
        };

        const renderL = () => {
            for (let i = lightning.length - 1; i >= 0; i--) {
                const light = lightning[i];
                ctx.strokeStyle = `hsla(100, 100%, 100%, ${rand(100, 10) / 100})`;
                ctx.lineWidth = 1;
                if (rand(0, 30) === 0) ctx.lineWidth = 2;
                if (rand(0, 60) === 0) ctx.lineWidth = 3;
                if (rand(0, 90) === 0) ctx.lineWidth = 4;
                if (rand(0, 120) === 0) ctx.lineWidth = 5;
                if (rand(0, 150) === 0) ctx.lineWidth = 6;

                ctx.beginPath();
                ctx.moveTo(light.x, light.y);

                for (let pc = 0; pc < light.path.length; pc++) {
                    ctx.lineTo(light.path[pc].x, light.path[pc].y);

                    if (light.canSpawn && rand(0, 100) === 0) {
                        light.canSpawn = false;
                        createL(light.path[pc].x, light.path[pc].y, false);
                    }
                }

                if (!light.hasFired) {
                    ctx.fillStyle = `rgba(252, 12, 12, ${rand(4, 12) / 100})`;
                    ctx.fillRect(0, 0, cw, ch);
                }

                if (rand(0, 30) === 0) {
                    ctx.fillStyle = `rgba(252, 12, 12, ${rand(1, 3) / 100})`;
                    ctx.fillRect(0, 0, cw, ch);
                }

                ctx.stroke();
            }
        };

        const lightningTimer = () => {
            lightTimeCurrent++;
            if (lightTimeCurrent >= lightTimeTotal) {
                const newX = rand(100, cw - 100);
                const newY = rand(0, ch / 2);
                let createCount = rand(1, 3);
                while (createCount--) {
                    createL(newX, newY, true);
                }
                lightTimeCurrent = 0;
                lightTimeTotal = rand(30, 100);
            }
        };

        const clearCanvas = () => {
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = `rgba(1, 253, 148, ${rand(1, 30) / 100})`;
            ctx.fillRect(0, 0, cw, ch);
            ctx.globalCompositeOperation = "source-over";
        };

        const loop = () => {
            requestAnimationFrame(loop);
            clearCanvas();
            updateL();
            lightningTimer();
            renderL();
        };

        const handleResize = () => {
            cw = canvas.width = window.innerWidth;
            ch = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        loop();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas className={css.svgRay} ref={canvasRef} id="Rayos" />;
};



