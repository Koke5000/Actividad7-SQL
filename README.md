SELECT id, titulo, autor
FROM public.libros
WHERE id IN (SELECT libro FROM public.ejemplares WHERE id = 1);
