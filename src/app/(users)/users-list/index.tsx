"use client";
import { FC, useMemo, useState, useEffect, useRef } from "react";
import {
  fetchUsers,
  MappedUserReturnType,
  UserApiResponse,
  UserQueryParams,
} from "@/app/utils/api/users";
import { ColumnDef, SortingState } from "@tanstack/react-table";
import Link from "next/link";
import Image from "next/image";
import FavoritesListIcon from "../../assets/wishlist-list-favorite.svg";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import TextInput from "@/app/components/shared/form/text-input";
import styles from "./users-list.module.css";
import VirtualizedTable from "@/app/components/shared/tables/virtualized-table";
import { useDebounce } from "@/app/utils/hooks/useDebounce";

import { PAGES } from "@/app/utils/constants/routes";
import { useIsMobile } from "@/app/utils/hooks/useIsMobile";
import Box from "@/app/components/shared/box";

interface Props {
  initialData: UserApiResponse;
}

const UsersList: FC<Props> = ({ initialData }) => {
  const isMobile = useIsMobile();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState("");
  const tableContainerRef = useRef<HTMLTableElement>(null);
  const debouncedSearch = useDebounce(searchValue, 300);
  const isDefaultQuery = !debouncedSearch && !sorting.length;
  const { data, fetchNextPage, isFetching, isLoading, refetch, isRefetching } =
    useInfiniteQuery<UserApiResponse>({
      queryKey: ["users", sorting, debouncedSearch],
      queryFn: async ({ pageParam }) => {
        const { skip } = pageParam as Pick<UserQueryParams, "skip">;
        const sortParams = !!sorting?.[0]
          ? {
              sortBy: sorting[0].id,
              sort: sorting[0].desc ? "desc" : "asc",
            }
          : {};
        const response = await fetchUsers({
          ...sortParams,
          limit: 20,
          skip,
          search: debouncedSearch,
        });
        return response;
      },
      initialPageParam: {
        skip: 0,
      },
      ...(isDefaultQuery
        ? {
            initialData: {
              pages: [initialData],
              pageParams: [{ skip: 0 }],
            },
          }
        : {}),
      getNextPageParam: (_lastPage, allPages) => {
        return {
          skip: allPages.flatMap((page) => page.data).length,
        };
      },
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
    });

  useEffect(() => {
    if (debouncedSearch) {
      refetch();
    }
  }, [debouncedSearch, refetch]);

  useEffect(() => {
    if (sorting.length) {
      refetch();
    }
  }, [sorting, refetch]);

  const columns = useMemo<ColumnDef<MappedUserReturnType>[]>(
    () => [
      {
        accessorKey: "username",
        cell: ({ row }) => {
          return (
            <Box minWidth={150} justifyContent="flex-start">
              <Image
                className={styles.profilePic}
                height={33}
                width={33}
                src={row.original.image}
                alt={row.original.uuid}
              />
              <Link
                className={styles.link}
                target="_blank"
                href={row.original.email}
              >
                {row.original.username}
              </Link>
            </Box>
          );
        },
        header: () => (
          <Box>
            <span>Usuario</span>
          </Box>
        ),
        minSize: 180,
      },
      {
        accessorKey: "email",
        cell: ({ row }) => {
          return (
            <Box>
              <a className={styles.link} href={`mailto:${row.original.email}`}>
                {row.original.email}
              </a>
            </Box>
          );
        },
        header: () => (
          <Box>
            <span>Email</span>
          </Box>
        ),
        enableSorting: false,
        minSize: 280,
      },
      {
        accessorKey: "phone",
        cell: ({ row }) => {
          return (
            <Box>
              <a className={styles.link} href={`tel:${row.original.phone}`}>
                {row.original.phone}
              </a>
            </Box>
          );
        },
        header: () => (
          <Box>
            <span>Telefono</span>
          </Box>
        ),
        enableSorting: false,
        minSize: 250,
      },
    ],
    []
  );

  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;

      const reachedBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const listCount: number =
        data?.pages?.flatMap((page) => page.data).length || 0;
      const totalCount: number =
        data?.pages?.[data.pages.length - 1]?.meta?.total || 0;
      if (reachedBottom && listCount < totalCount && !isFetching) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [data, fetchNextPage, isFetching, flatData.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setSearchValue(() => e.target.value);
  };

  return (
    <div className={styles.root}>
      <div className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <TextInput
            placeholder="Ingresa un nombre para buscar..."
            onChange={handleInputChange}
            name="Search"
            type="search"
            value={searchValue}
          />
        </div>
        <Link href={PAGES.favorites} className={styles.favoritesLink}>
          {isMobile ? <FavoritesListIcon /> : "Ver Lista de Favoritos"}
        </Link>
      </div>
      <div className={styles.tableContainer}>
        <VirtualizedTable
          containerRef={tableContainerRef}
          columnVisibility={{ email: !isMobile, phone: !isMobile }}
          data={flatData}
          columns={columns}
          sortingState={sorting}
          onSortChange={(updater) => setSorting(updater)}
          isLoading={isLoading}
          isLoadingExtraData={isFetching || isRefetching}
        />
      </div>
    </div>
  );
};

export default UsersList;
